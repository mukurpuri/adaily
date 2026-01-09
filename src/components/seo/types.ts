// SEO Content Types for Adaily Tool Pages

export interface ToolSeoExample {
  title?: string;
  steps: string[];
  mathLine?: string;
  takeaway: string;
}

export interface ToolSeoFaq {
  q: string;
  a: string;
}

export interface ToolSeoContent {
  toolName: string;
  toolId: string;
  whatIs: string;
  whyPeopleStruggle: string[];
  example: ToolSeoExample;
  howThisToolHelps: string[];
  howToReadResult: string[];
  whatItDoesNotDo: string[];
  faqs: ToolSeoFaq[];
  nextSteps: string[];
  disclaimer: string;
  relatedTools?: { name: string; href: string; icon: string }[];
}

export interface ToolSeoSectionProps extends ToolSeoContent {
  showFaqSchema?: boolean;
  accentColor?: 'orange' | 'blue' | 'purple' | 'green' | 'amber';
}

