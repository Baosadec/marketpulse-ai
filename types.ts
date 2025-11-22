export interface StockData {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    history: { time: string; price: number }[];
    name: string;
  }
  
  export interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    image: string;
    sparkline_in_7d?: {
      price: number[];
    };
  }
  
  export type NewsCategory = 'General' | 'Crypto' | 'Stocks' | 'Video' | 'Education';

  export interface NewsItem {
    id: string;
    title: string;
    source?: string;
    url?: string;
    summary: string;
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    relatedTickers: string[];
    timestamp: number;
    type: 'ai' | 'local';
    category: NewsCategory;
    videoUrl?: string;
  }
  
  export interface GeminiInsight {
    summary: string;
    outlook: string;
    keyEvents: string[];
    groundingUrls: { title: string; uri: string }[];
  }
  
  export enum LoadingState {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
  }