import { Request, Response } from 'express';
import TagService from '../services/tag.service';
import { asyncHandler } from '../middleware/errorHandler';


const TagController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const tags = await TagService.getAll();
    res.status(200).json({ success: true, data: tags });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if tag exists
    const tag = await TagService.getById(id);
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }
    res.status(200).json({ success: true, data: tag });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const { key } = req.query;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ success: false, message: 'Key query parameter is required' });
    }

    let condition: any =[
      { name: { $regex: key, $options: 'i' } },
      { type: { $regex: key, $options: 'i' } }
    ]

    const tags = await TagService.find({ $or: condition });
    res.status(200).json({ success: true, data: tags });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    
    // Check if tag name already exists
    const existed = await TagService.findOne({ name: data.name });
    if (existed) {
      return res.status(400).json({ success: false, message: 'Tag name already exists' });
    }

    const tag = await TagService.create(data);
    res.status(201).json({ success: true, data: tag });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // Check if tag exists
    const tag = await TagService.getById(id);
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }

    // Check if tag name already exists
    if (data.name && data.name !== tag.name) {
      const existed = await TagService.findOne({ name: data.name });
      if (existed) {
        return res.status(400).json({ success: false, message: 'Tag name already exists' });
      }
    }
    
    await TagService.update(id, data);
    res.status(200).json({ success: true, message: 'Tag updated successfully'});
  }),
  
  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if tag exists
    const tag = await TagService.getById(id);
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }

    await TagService.delete(id);
    res.status(200).json({ success: true, message: 'Tag deleted successfully' });
  }),

};

export default TagController;
