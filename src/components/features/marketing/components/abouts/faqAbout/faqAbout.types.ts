interface FaqAboutItems {
  service: string;
  question: string;
  preview: {
    text: string;
    libelle?: string[];
  };
}

export type FaqAboutProps = FaqAboutItems[];
