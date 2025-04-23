export interface PlacesApiResponse {
  status: string
  data: PlacesApiItem[]
}

export interface PlacesApiItem {
  placePrediction: PlacePrediction
}

export interface PlacePrediction {
  place: string
  placeId: string
  text: Text
  structuredFormat: StructuredFormat
  types: string[]
}

export interface Text {
  text: string
  matches: Match[]
}

export interface Match {
  endOffset: number
}

export interface StructuredFormat {
  mainText: MainText
  secondaryText: SecondaryText
}

export interface MainText {
  text: string
  matches: Match2[]
}

export interface Match2 {
  endOffset: number
}

export interface SecondaryText {
  text: string
}
