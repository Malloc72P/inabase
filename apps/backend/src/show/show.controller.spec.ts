import { Test, TestingModule } from '@nestjs/testing';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { ShowDto, CreateShowInput, UpdateShowInput } from '@repo/dto';
import { Show } from './show.entity';

describe('ShowController', () => {
  let controller: ShowController;
  let showService: jest.Mocked<ShowService>;

  const mockShow: Show = new Show();
  mockShow.id = '1';
  mockShow.title = 'Test Show';
  mockShow.tags = ['test'];
  mockShow.deleted = false;
  const mockShowDto: ShowDto = {
    id: '1',
    title: 'Test Show',
    tags: ['test'],
  };

  beforeEach(async () => {
    const mockShowService = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        {
          provide: ShowService,
          useValue: mockShowService,
        },
      ],
    }).compile();

    controller = module.get<ShowController>(ShowController);
    showService = module.get(ShowService);
  });

  describe('shows', () => {
    it('should return an array of shows', async () => {
      showService.findAll.mockResolvedValue({ shows: [mockShow] });

      const result = await controller.shows();

      expect(result.shows).toHaveLength(1);
      expect(result.shows[0]).toEqual(mockShowDto);
      expect(showService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a show', async () => {
      const createShowInput: CreateShowInput = {
        title: 'Test Show',
        tags: ['test'],
      };

      showService.create.mockResolvedValue({ show: mockShow });

      const result = await controller.create(createShowInput);

      expect(result.show).toEqual(mockShowDto);
      expect(showService.create).toHaveBeenCalledWith(createShowInput);
    });
  });

  describe('update', () => {
    it('should update a show', async () => {
      const updateShowInput: UpdateShowInput = {
        title: 'Updated Show',
        tags: ['updated'],
      };
      const updatedShow: Show = new Show();
      updatedShow.id = '1';
      updatedShow.title = 'Updated Show';
      updatedShow.tags = ['updated'];
      updatedShow.deleted = false;
      const updatedShowDto: ShowDto = {
        id: '1',
        title: 'Updated Show',
        tags: ['updated'],
      };

      showService.update.mockResolvedValue({ show: updatedShow });

      const result = await controller.update('1', updateShowInput);

      expect(result.show).toEqual(updatedShowDto);
      expect(showService.update).toHaveBeenCalledWith({ id: '1', ...updateShowInput });
    });
  });

  describe('delete', () => {
    it('should delete a show', async () => {
      showService.remove.mockResolvedValue(undefined);

      const result = await controller.delete('1');

      expect(result).toEqual({});
      expect(showService.remove).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
