import { LargeNumberLike } from 'crypto';
import { round } from 'lodash';


export interface Road_line {
  start_road: number;
  end_road: number;
  lenght_road: number;
  flatness_road_lane_1: number;
  flatness_road_lane_2: number;
  road_defects_1: number;
  road_defects_2: number;
  road_grip_1: number;
  road_grip_2: number;
}