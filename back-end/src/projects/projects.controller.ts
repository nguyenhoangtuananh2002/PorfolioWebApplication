import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('projects') // Adds a tag for grouping
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto }) // Adds description for the body parameter
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific project by ID' })
  @ApiParam({ name: 'id', description: 'ID of the project' }) // Describes the 'id' parameter
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project by ID' })
  @ApiParam({ name: 'id', description: 'ID of the project to update' }) // Describes the 'id' parameter
  @ApiBody({ type: UpdateProjectDto }) // Adds description for the body parameter
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiParam({ name: 'id', description: 'ID of the project to delete' }) // Describes the 'id' parameter
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
