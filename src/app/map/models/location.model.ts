export interface LocationModel {
  coordinates: number[],
  properties: {
    state: string,
    name: string,
    type: string,
    logo?: string
  }
}
