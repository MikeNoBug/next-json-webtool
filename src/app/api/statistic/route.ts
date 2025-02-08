import { prisma } from '@/server/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const res = await prisma.dailycount.findFirst({
      where: {
        date: {
          equals: date,
        },
      },
    });
    const countRes = await prisma.dailycount.aggregate({
      _sum: {
        count: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: {
        todayCount: res?.count || 0,
        allCount: countRes._sum.count || 0,
      },
    });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err });
  }
}

export async function POST() {
  try {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    const existingRecord = await prisma.dailycount.findFirst({
      where: {
        date: {
          equals: date,
        },
      },
    });

    if (existingRecord) {
      await prisma.dailycount.update({
        where: { id: existingRecord.id },
        data: { count: { increment: 1 } },
      });
      return NextResponse.json({ success: true, data: null });
    }
    await prisma.dailycount.create({
      data: { date, count: 1 },
    });
    return NextResponse.json({ success: true, data: null });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, msg: err });
  }
}
