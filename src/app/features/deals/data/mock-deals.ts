import { Deal } from '../model/types';

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    title: 'Enterprise License — Tech Solutions',
    value: 48000,
    stage: 'negotiation',
    description: 'Annual enterprise license for 50 seats. Awaiting legal review.',
    contactId: 'c1',
    public: true,
    createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'd2',
    title: 'Pilot Program — DataFlow',
    value: 12000,
    stage: 'new',
    description: '3-month pilot for data integration module.',
    contactId: 'c2',
    public: false,
    createdAt: '2026-02-28T12:30:00Z',
  },
  {
    id: 'd3',
    title: 'Design Workshop — Creative Agency',
    value: 5000,
    stage: 'proposal',
    description: 'One-week UX/UI workshop with deliverables.',
    contactId: 'c3',
    public: true,
    createdAt: '2026-02-01T16:00:00Z',
  },
  {
    id: 'd4',
    title: 'Renewal — BuildRight',
    value: 24000,
    stage: 'closed-lost',
    description: 'Customer decided not to renew. Budget constraints.',
    contactId: 'c4',
    public: false,
    createdAt: '2025-12-15T10:00:00Z',
  },
];
