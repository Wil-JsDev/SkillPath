import { Module } from '@nestjs/common';
import { CoreModule } from '@skillpath/core';

@Module({
  imports: [CoreModule],
})
export class WorkerModule {}
