import {
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  trace,
} from '@opentelemetry/api';
import { Resource } from '@opentelemetry/resources';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

let configured = false;

function parseOtelHeaders(raw?: string): Record<string, string> {
  if (!raw) return {};
  return raw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const idx = part.indexOf('=');
      if (idx === -1) return acc;
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim();
      if (k) acc[k] = v;
      return acc;
    }, {});
}

export function configureTracing(serviceName: string) {
  if (configured) return;

  if (process.env.OTEL_DIAG === 'debug') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  }

  const provider = new NodeTracerProvider({
    resource: new Resource({
      'service.name': serviceName,
    }),
  });

  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT; // e.g. http://localhost:4318/v1/traces
  if (endpoint) {
    const headers = parseOtelHeaders(process.env.OTEL_EXPORTER_OTLP_HEADERS);
    provider.addSpanProcessor(
      new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: endpoint,
          headers: Object.keys(headers).length ? headers : undefined,
        })
      )
    );
  }

  provider.register();

  registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
  });

  configured = true;
}

export function tracer() {
  return trace.getTracer('cypress');
}
