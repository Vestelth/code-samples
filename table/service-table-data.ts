// TODO: refactor needed (?)
export const tableData = {
  tableHeaders: {
    service: 'Usługa',
    car: 'Samochód',
    regNumber: 'Nr. rejestr.',
    owner: 'Właściciel',
    status: 'Status usługi',
    acceptDate: 'Data przyjęcia',
    issueDate: 'Data wykonania',
    price: 'Cena(brutto)'
  },
  displayBool: {
    service: true,
    car: true,
    regNumber: true,
    owner: true,
    status: true,
    acceptDate: true,
    issueDate: true,
    price: true
  },
  dataArray: [
    {
      service: 'Usługa01',
      car: 'Opel',
      regNumber: 'CCH4JB5',
      owner: 'Zygfryda Tumor',
      status: 'in-progress',
      acceptDate: '2017-06-12',
      issueDate: '2017-07-20',
      price: 150
    },
    {
      service: 'Usługa12',
      car: 'Volkswagen',
      regNumber: 'CCH4JB5',
      owner: 'Olgierd Grzyb',
      status: 'done',
      acceptDate: '2017-09-05',
      issueDate: '2017-10-01',
      price: 850
    },
    {
      service: 'Usługa05',
      car: 'Mazda',
      regNumber: 'CCH4JB5',
      owner: 'Arek Zegarek',
      status: 'awaiting',
      acceptDate: '2017-09-12',
      issueDate: '2017-09-20',
      price: 100
    }
  ]
};
