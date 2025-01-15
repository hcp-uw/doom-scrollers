import { NextResponse } from 'next/server';

type HealthCheckResponse = {
  ok: boolean;
};

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  return NextResponse.json({
    ok: true,
  });
}
