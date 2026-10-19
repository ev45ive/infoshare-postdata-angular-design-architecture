export type DealStage = 'new' | 'negotiation' | 'proposal' | 'closed-won' | 'closed-lost';

/** API response shape — does NOT include tasks. */
export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  description: string;
  contactId: string;
  public: boolean;
  createdAt: string;
}
