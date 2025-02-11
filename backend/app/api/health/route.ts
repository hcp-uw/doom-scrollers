import { NextResponse } from 'next/server';

type HealthCheckResponse = {
  ok: boolean;
};

// Test this file
export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  return NextResponse.json({
    ok: true,
  });
}
