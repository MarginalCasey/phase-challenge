import { ElementType, IPage } from "./types";

export const pages: IPage[] = [
  {
    id: 1,
    name: "Page 1",
    elements: [
      {
        type: ElementType.Frame,
        id: "0",
        name: "Frame 1",
        x: 200,
        y: 200,
        width: 300,
        height: 200,
        alpha: 1,
        fill: {
          color: "lightblue",
        },
        children: [
          {
            type: ElementType.Rectangle,
            id: "1",
            name: "Rectangle 1",
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            alpha: 1,
            fill: {
              color: "red",
              alpha: 0.2,
            },
          },
          {
            type: ElementType.Text,
            id: "4",
            name: "Text 1",
            x: 5,
            y: 5,
            alpha: 1,
            text: "Text 1",
            style: {
              fontSize: 24,
            },
          },
        ],
      },
      {
        type: ElementType.Rectangle,
        id: "2",
        name: "Rectangle 2",
        x: 200,
        y: 50,
        width: 100,
        height: 100,
        alpha: 0.5,
        fill: {
          color: "red",
        },
        stroke: {
          color: "black",
          width: 5,
        },
      },
      {
        type: ElementType.Rectangle,
        id: "3",
        name: "Rectangle 3",
        x: 400,
        y: 50,
        width: 100,
        height: 100,
        alpha: 1,
        fill: {
          color: "red",
        },
      },
      {
        type: ElementType.Rectangle,
        id: "4",
        name: "Rectangle 4",
        x: 600,
        y: 50,
        width: 100,
        height: 100,
        alpha: 1,
        stroke: {
          alignment: 0,
          color: "black",
          width: 5,
        },
      },
    ],
  },
  {
    id: 2,
    name: "Page 2",
    elements: [],
  },
];
