import { Test, TestingModule } from '@nestjs/testing';
import { InterventionsController } from './interventions.controller';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';

type intervention_type = 'technique' | 'Non_technique';

describe('InterventionsController', () => {
  let controller: InterventionsController;
  let service: InterventionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterventionsController],
      providers: [
        {
          provide: InterventionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findPending: jest.fn(),
            findCompleted: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            complete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InterventionsController>(InterventionsController);
    service = module.get<InterventionsService>(InterventionsService);
  });

  describe('create', () => {
    const fixedDate = new Date('2025-05-10T12:00:00Z');

    it('should create a technical intervention', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 10,
        scheduled_date: new Date('2025-05-20'),
        maintenancier_id: 2,
        status: 'pending',
        type: 'technique',
        description: 'Maintenance régulière',
      };

      const expectedResult = {
        id: 1,
        device_id: 10,
        maintenancier_id: 2,
        scheduled_date: new Date('2025-05-20'),
        completion_date: null,
        description: 'Maintenance régulière',
        status: 'pending',
        type: 'technique' as intervention_type,
        created_at: fixedDate,
        title: null,
        location: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      const result = await controller.create(createInterventionDto);
      expect(service.create).toHaveBeenCalledWith(createInterventionDto);
      expect(result).toEqual(expectedResult);
    });

    it('should create a non-technical intervention', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 5,
        scheduled_date: new Date('2025-05-21'),
        maintenancier_id: 2,
        status: 'pending',
        type: 'Non_technique',
        description: 'Maintenance régulière',
      };

      const expectedResult = {
        id: 2,
        device_id: 5,
        maintenancier_id: 2,
        scheduled_date: new Date('2025-05-21'),
        completion_date: null,
        description: 'Maintenance régulière',
        status: 'pending',
        type: 'Non_technique' as intervention_type,
        created_at: fixedDate,
        title: null,
        location: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      const result = await controller.create(createInterventionDto);
      expect(service.create).toHaveBeenCalledWith(createInterventionDto);
      expect(result).toEqual(expectedResult);
    });

    it('should create an intervention with minimal fields', async () => {
      const createInterventionDto: CreateInterventionDto = {
        device_id: 7,
        maintenancier_id: 4,
        scheduled_date: new Date('2025-06-15'),
        type: 'technique',
      };

      const expectedResult = {
        id: 3,
        device_id: 7,
        maintenancier_id: 4,
        scheduled_date: new Date('2025-06-15'),
        completion_date: null,
        description: null,
        status: null,
        type: 'technique' as intervention_type,
        created_at: fixedDate,
        title: null,
        location: null,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      const result = await controller.create(createInterventionDto);
      expect(service.create).toHaveBeenCalledWith(createInterventionDto);
      expect(result).toEqual(expectedResult);
    });
  });
});