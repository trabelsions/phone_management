import { Module } from '@nestjs/common';
import { AgentService } from './agents.service';
import { AgentController } from './agents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './agent.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]), // Import Agent entity and repository here
    // Other modules or services if needed
  ],
  providers: [AgentService],
  controllers: [AgentController],
  
})
export class AgentsModule {}
