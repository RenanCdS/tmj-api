import { Module } from '@nestjs/common';
import { ProposalController } from './proposal.controller';

@Module({
  controllers: [ProposalController]
})
export class ProposalModule {}
