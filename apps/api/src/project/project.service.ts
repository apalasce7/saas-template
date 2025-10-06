import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto, ownerId: number) {
    return this.prisma.project.create({
      data: { ...createProjectDto, ownerId },
    });
  }

  findAll(ownerId: number) {
    return this.prisma.project.findMany({ where: { ownerId } });
  }

  findOne(id: number, ownerId: number) {
    return this.prisma.project.findFirst({ where: { id, ownerId } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto, ownerId: number) {
    return this.prisma.project.updateMany({
      where: { id, ownerId },
      data: updateProjectDto,
    });
  }

  remove(id: number, ownerId: number) {
    return this.prisma.project.deleteMany({ where: { id, ownerId } });
  }
}
