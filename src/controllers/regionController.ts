import { Request, Response } from 'express';
import Region from '../models/Region';
import State, { IState } from '../models/State';
import LGA from '../models/LGA';

// Controller function to add a new region
export const addRegion = async (req: Request, res: Response) => {
  const { name, metadata } = req.body;

  try {
    const region = new Region({
      name,
      metadata,
      states: [],
    });

    const savedRegion = await region.save();
    res.status(201).json({ region: savedRegion });
  } catch (error) {
    res.status(500).json({ message: 'Error adding region' });
  }
};

// Controller function to get all regions
export const getRegions = async (req: Request, res: Response) => {
  try {
    const regions = await Region.find();
    const populatedRegions = await Promise.all(
      regions.map(async (region) => {
        const populatedRegion = region.toObject();
        const states = await State.find({ region: region._id }).select('name');
        populatedRegion.states = states.map((state) => state.name); 
        return populatedRegion;
      })
    );
    res.json({ regions: populatedRegions });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving regions' });
  }
};

// Controller function to get states within a region
export const getStatesByRegion = async (req: Request, res: Response) => {
  const regionId = req.params.regionId;

  try {
    const states: IState[] = await State.find({ region: regionId });
    const populatedStates: IState[] = await Promise.all(
      states.map(async (state) => {
        const populatedState: IState = state.toObject();
  populatedState.region = (state.region as any)?.name || state.region.toString(); 
      populatedState.metadata = (state.region as any)?.metadata || state.metadata; 
        return populatedState;
      })
    );
    res.json({ states: populatedStates });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving states' });
  }
};

// Controller function to search for regions, states, or LGAs
export const search = async (req: Request, res: Response) => {
  const query: string = req.query.query as string;

  try {
     const regions = await Region.find({ name: { $regex: query, $options: 'i' } });
    const populatedRegions = await Promise.all(
      regions.map(async (region) => {
        const populatedRegion = region.toObject();
        const states = await State.find({ region: region._id }).select('name');
        populatedRegion.states = states.map((state) => state.name);
        populatedRegion.metadata = region.metadata;
        return populatedRegion;
      })
    );

    const states: IState[] = await State.find({ name: { $regex: query, $options: 'i' } });
    const populatedStates: IState[] = await Promise.all(
      states.map(async (state) => {
        const populatedState: IState = state.toObject();
        const region = await Region.findById(state.region);
    //@ts-ignore
        populatedState.region = region ? region.name as string : state.region; 
        populatedState.metadata = state.metadata; 
        populatedState.LGAs = (await LGA.find({
state: state._id }).select('name')).map((lga) => lga.name);
return populatedState;
})
);
const lgas = await LGA.find({ name: { $regex: query, $options: 'i' } });
const populatedLGAs = await Promise.all(
  lgas.map(async (lga) => {
    const populatedLGA = lga.toObject();
    const state: IState | null = await State.findById(lga.state);
    populatedLGA.state = state ? state.name as string : lga.state; 
    populatedLGA.metadata = lga.metadata; 
    return populatedLGA;
  })
);

res.json({ regions: populatedRegions, states: populatedStates, lgas: populatedLGAs });
} catch (error) {
res.status(500).json({ message: 'Error searching for data' });
}
};