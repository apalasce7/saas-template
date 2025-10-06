import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Request() req, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectService.findOne(+id, req.user.sub);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.projectService.remove(+id, req.user.sub);
  }
}
