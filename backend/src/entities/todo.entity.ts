import { ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  @ApiPropertyOptional({
    example: '00000000-0000-0000-0000-000000000000',
    description: 'Entity uuid',
  })
  uuid: string;

  @Column()
  position: number;

  @Column()
  value: string;

  @Column({ default: false })
  completed?: boolean;
}