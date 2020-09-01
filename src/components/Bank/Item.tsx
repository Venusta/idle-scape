/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */

import React from "react";
import { getIcon } from "../../model/Icon";

interface ItemProps {
  itemID: number;
  amount: string;
  colour: string;

}

interface ItemImageProps {
  itemID: number
}

// const defaultImage = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACPUlEQVR4Xs2Xz0sCQRTHe39Ch+4SnSIiunTp0KUOURBREUQQkQUlEhWViYiUlYgopSJKVPbLQxSKx+hfe/FmmmZnRitzdu0LAzs7677P+zGzz64uzwSo3+mACIKPVOr487pjAqzXK/j4WMS7ch4TiSgDGvL53ICSnusrUsBAKpUSlkoZPDuL4MbGyg+/aVkcolBIYTodZ0Yag/HoiDRdXV1gNLqPJ8dHNqMEmM8n2QtjsUMMhbZxbm6azTOZUw0K8P6+4DAOeHAQZJGyCpTLJnBhYcYRFT4EqA5FhqVxvq7ea0uAlxfn2kuBpU4Y6+npVqB0wxZhSDI1utcChGrLTJ+rUqNDxmu1JwckYLGYdpw5HoCpIefRoSKna0qpE+b5+cYbKClumHaPE0RESxS7xbr5TrxmZGpkOgUQnT1y3XWZEGYkAG9vcl/nj7pmTerOMiF0AV5fZ92C4h5Tsb691diO+p0RV6DkOZRMxtgQhfxzlEhqivXVFgXsqx0MruPAQP+nl3xMTU782mtLMCTASGQPx8fHNC8Bl5bmW4iSFfEULS7ONgg54ObmqvdAgcBaAxi+Rm2FR0DOA60RDL8vPhvmmlUBvr6UWRMmwJobbAbbluSuoUGN2O7OFmvGRkdHjD5Hf946DDXjdHBR70tzqhnaUX19vYpRsbPe3+vo9y+zZ0xYK9K9VedOmHg8zCI3PDRoPKO/tS2phs25MC7OIhPWU/G6Cod3Og0iBFitPtj+X9WuXKyXv+pfwXilD/dz/gBHQmUuAAAAAElFTkSuQmCC";

// const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//   e.currentTarget.src = defaultImage;
// };
// src={`../../assets/images/${itemID}.png`}
// onError={(e) => handleError(e)}
const ItemImage = ({ itemID }: ItemImageProps): JSX.Element => (
  <img
    className="itemImage"
    width="36"
    height="32"
    src={`data:image/png;base64, ${getIcon(itemID)}`}
  />
);

interface ItemAmountTagProps {
  amount: string
  colour: string
}

const ItemAmountTag = ({ amount, colour }: ItemAmountTagProps) => (
  <div className={`itemAmountTag ${colour}`}>{amount}</div>
);

export const Item = ({ itemID, amount, colour }: ItemProps): JSX.Element => (
  <div className="item" title={`${itemID}`}>
    <ItemAmountTag amount={amount} colour={colour} />
    <ItemImage itemID={itemID} />
  </div>
);

export const ItemInBank = ({ itemID, amount, colour }: ItemProps): JSX.Element => {
  let extra = "";
  if (amount === "0") {
    extra = " itemImage-placeholder";
  }

  return (
    <div className={`itemInBank ${extra}`} draggable="true">
      <Item itemID={itemID} amount={amount} colour={colour} />
    </div>
  );
};
