interface ICurrentAccount {
  name: string;
  count: number;
  isUntouchable?: boolean;
}

interface IBank {
  name: string;
  color: string;
  currAccounts: ICurrentAccount[];
}

interface IActiv {
  name: string;
  price: number;
}

interface IDataItem {
  date: string;
  banks: IBank;
  activs: IActiv[];
}

export const DATA: IDataItem[] = [
  {
    date: "2022-01-01",
    banks: {
      name: "t-bank",
      color: "jellow",
      currAccounts: [
        {
          name: "Основной счет",
          count: 1000,
        },
        {
          name: "Основной счет",
          count: 1000,
          isUntouchable: true,
        },
      ],
    },
    activs: [
      {
        name: "наушники",
        price: 1000,
      },
    ],
  },
  {
    date: "2022-01-01",
    banks: {
      name: "t-bank",
      color: "jellow",
      currAccounts: [
        {
          name: "Основной счет",
          count: 1000,
        },
        {
          name: "Основной счет",
          count: 1000,
          isUntouchable: true,
        },
      ],
    },
    activs: [
      {
        name: "наушники",
        price: 1000,
      },
    ],
  },
];
