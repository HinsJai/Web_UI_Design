import I1 from "../img/i1.png";
import F1 from "../img/f1.png";
import C3 from "../img/c3.png";
import Fi1 from "../img/fi1.png";
import { IoFastFood } from "react-icons/io5";
import { MdOutlineSupervisorAccount, MdEventNote } from 'react-icons/md';
import { FiBarChart } from 'react-icons/fi';
import { HiReceiptRefund } from "react-icons/hi2";


export const heroData = [
  {
    id: "i1",
    name: "Dessert",
    desc: "Chocolate & vanilla",
    price: "60",
    imageSrc: I1,
  },
  {
    id: "i2",
    name: "Strawberries",
    desc: "Fresh Strawberries",
    price: "100",
    imageSrc: F1,
  },
  {
    id: "i3",
    name: "Chicken Kebab",
    desc: "Mixed Kebab Plate",
    price: "150",
    imageSrc: C3,
  },
  {
    id: "i4",
    name: "Fish Kebab",
    desc: "Mixed Fish Kebab",
    price: "250",
    imageSrc: Fi1,
  },
  // {
  //   id: 5,
  //   name: "Fish Kebab",
  //   decp: "Mixed Fish Kebab",
  //   price: "5.25",
  //   imageSrc: Fi1,
  // },
  // {
  //   id: 6,
  //   name: "Fish Kebab",
  //   decp: "Mixed Fish Kebab",
  //   price: "5.25",
  //   imageSrc: Fi1,
  // },
];

//Restaurant category
export const categories = [
  {
    id: "c1",
    name: "Noodle",
    category: "noodle",
  },
  {
    id: "c2",
    name: "West Food",
    category: "west food",
  },
  {
    id: "c3",
    name: "Rice",
    category: "rice",
  },
  {
    id: "c4",
    name: "Fast Food",
    category: "fast food",
  },
  {
    id: "c5",
    name: "Fruits",
    category: "fruits",
  },
  {
    id: "c6",
    name: "Dessert",
    category: "dessert",
  },

  {
    id: "c7",
    name: "Drinks",
    category: "drinks",
  },
];

export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39,354',
    percentage: '-4%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <IoFastFood />,
    amount: '54',
    percentage: '+23%',
    title: 'Foods',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '$423,39',
    percentage: '+38%',
    title: 'Sales',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',

    pcColor: 'green-600',
  },
  {
    icon: <MdEventNote />,
    amount: '678',
    percentage: '-12%',
    title: 'Accept Orders',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    icon: <HiReceiptRefund />,
    amount: '20',
    percentage: '-29%',
    title: 'Reject Orders',
    iconColor: 'rgb(255, 102, 102)',
    iconBg: 'rgb(209, 224, 224)',
    pcColor: 'red-600',
  },
];

export const courierEarningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '125',
    percentage: '+3%',
    title: 'Customers',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
  },
  {
    icon: <IoFastFood />,
    amount: '253',
    percentage: '+23%',
    title: 'Foods',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '200 km',
    percentage: '+38%',
    title: 'Distance',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  {
    icon: <MdEventNote />,
    amount: '255',
    percentage: '+22%',
    title: 'Accept Orders',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'green-600',
  },
  {
    icon: <HiReceiptRefund />,
    amount: '3',
    percentage: '-40%',
    title: 'Late Delivery',
    iconColor: 'rgb(255, 102, 102)',
    iconBg: 'rgb(209, 224, 224)',
    pcColor: 'red-600',
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];

export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Germany',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

  {
    dataSource: lineChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'England',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

  {
    dataSource: lineChartData[2],
    xName: 'x',
    yName: 'y',
    name: 'India',
    width: '2',
    marker: { visible: true, width: 10, height: 10 },
    type: 'Line'
  },

];

export const LinePrimaryXAxis = {
  valueType: 'DateTime',
  labelFormat: 'y',
  intervalType: 'Years',
  edgeLabelPlacement: 'Shift',
  majorGridLines: { width: 0 },
  background: 'white',
};

export const LinePrimaryYAxis = {
  labelFormat: '{value}%',
  rangePadding: 'None',
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const stackedChartData = [
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
  [
    { x: 'Jan', y: 111.1 },
    { x: 'Feb', y: 127.3 },
    { x: 'Mar', y: 143.4 },
    { x: 'Apr', y: 159.9 },
    { x: 'May', y: 159.9 },
    { x: 'Jun', y: 159.9 },
    { x: 'July', y: 159.9 },
  ],
];

export const stackedCustomSeries = [

  {
    dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Budget',
    type: 'StackingColumn',
    background: 'blue',

  },

  {
    dataSource: stackedChartData[1],
    xName: 'x',
    yName: 'y',
    name: 'Expense',
    type: 'StackingColumn',
    background: 'red',

  },

];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};

export const ecomPieChartData = [
  { x: '2019', y: 18, text: '35%' },
  { x: '2020', y: 18, text: '15%' },
  { x: '2021', y: 18, text: '25%' },
  { x: '2022', y: 18, text: '25%' },
];

export const SparklineAreaData = [
  { x: 1, yval: 5 },
  { x: 2, yval: 6 },
  { x: 3, yval: 7 },
  { x: 4, yval: 8 },
  { x: 5, yval: 9 },

];

export const SparklineAreaData2 = [
  { x: 1, yval: 3 },
  { x: 2, yval: 1 },
  { x: 3, yval: 2 },
  { x: 4, yval: 5 },
  { x: 5, yval: 7 },

];
