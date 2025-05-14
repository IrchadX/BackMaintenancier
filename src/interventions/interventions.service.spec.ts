import { Test, TestingModule } from '@nestjs/testing';
import { InterventionsService } from './interventions.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
type intervention_type = 'technique' | 'Non_technique';

describe('InterventionsService', () => {
  let service: InterventionsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterventionsService,
        {
          provide: PrismaService,
          useValue: {
            intervention_history: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InterventionsService>(InterventionsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a technical intervention', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 10,
        scheduled_date: new Date('2025-05-20'),
        maintenancier_id: 2,
        status: "pending",
        type: 'technique',
        description: "Maintenance régulière",
      };

      const techExpectedResult = {
        id: 1,
        device_id: 10,
        maintenancier_id: 2,
        scheduled_date: new Date('2025-05-20'),
        completion_date: null,
        description: "Maintenance régulière",
        status: "pending",
        type: 'technique' as intervention_type,
        created_at: new Date(),
        title: null,  // Added missing field
        location: null,  // Added missing field
      };

      jest.spyOn(prismaService.intervention_history, 'create').mockResolvedValue(techExpectedResult);
      const result = await service.create(createInterventionDto);
      expect(result).toEqual(techExpectedResult);
      expect(prismaService.intervention_history.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          device_id: 10,
          maintenancier_id: 2,
          type: 'technique',
        }),
      });
    });

    it('should create a non-technical intervention', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 5,
        scheduled_date: new Date('2025-05-21'),
        maintenancier_id: 3,
        type: 'Non_technique',
        description: "Formation utilisateur",
      };

      const nonTechExpectedResult = {
        id: 2,
        device_id: 5,
        maintenancier_id: 3,
        scheduled_date: new Date('2025-05-21'),
        completion_date: null,
        description: "Formation utilisateur",
        status: null,
        type: 'Non_technique' as intervention_type,
        created_at: new Date(),
        title: null,  // Added missing field
        location: null,  // Added missing field
      };

      jest.spyOn(prismaService.intervention_history, 'create').mockResolvedValue(nonTechExpectedResult);
      const result = await service.create(createInterventionDto);
      expect(result).toEqual(nonTechExpectedResult);
      expect(prismaService.intervention_history.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          device_id: 5,
          maintenancier_id: 3,
          type: 'Non_technique',
        }),
      });
    });

    it('should create an intervention with minimal fields', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 7,
        maintenancier_id: 4,
        scheduled_date: new Date('2025-06-15'),
        type: 'technique',
      };

      const minimalExpectedResult = {
        id: 3,
        device_id: 7,
        maintenancier_id: 4,
        scheduled_date: new Date('2025-06-15'),
        completion_date: null,
        description: null,
        status: "pending", // Assuming this is the default
        type: 'technique' as intervention_type,
        created_at: new Date(),
        title: null,  // Added missing field
        location: null,  // Added missing field
      };

      jest.spyOn(prismaService.intervention_history, 'create').mockResolvedValue(minimalExpectedResult);
      const result = await service.create(createInterventionDto);
      expect(result).toEqual(minimalExpectedResult);
      expect(prismaService.intervention_history.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          device_id: 7,
          maintenancier_id: 4,
          type: 'technique',
        }),
      });
    });
  });
});