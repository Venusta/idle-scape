/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v1 as uuid } from "uuid";
import "./Cards.css";

import { filterJob, sortNodes } from "../../redux-stuff";
import {
  localToEorzea, getTranslation, formatTimes, eMinsTillNextSpawn, asset,
} from "../../utils";

const Icon = ({ icon, name = "", className = "" }) => <img key={`Icon-${uuid()}`} src={asset(icon)} className={className} alt={name} title={name} />;

const Resource = ({
  name, icon, suffix, suffixName, scrip,
}) => (
  <div className="resource">
    <Icon className="icon" icon={icon} name={name} />
    <div key={uuid()} className="name">{name}</div>
    {suffix
      ? <Icon className="suffix-icon" icon={suffix} name={suffixName} />
      : null}
    {scrip
      ? <Icon className="suffix-icon" icon={scrip} />
      : null}
  </div>
);

const Resources = ({ node, job }) => (
  <div className="resource-container">
    {node.map((item) => (
      <Resource
        key={`res-${uuid()}`}
        name={item.name}
        icon={item.icon}
        suffix={item.suffix}
        suffixName={item.suffixName}
        scrip={item.scrip}
      />
    ))}
  </div>
);

const Cards = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const [et, setET] = useState(localToEorzea(new Date()));
  const cards = useSelector((state) => state.cards);

  const updateOnHourChange = et.getHours();

  const handleNodeSorting = () => {
    dispatch(sortNodes());
  };

  const handleFilter = () => {
    dispatch(filterJob("min"));
  };

  useEffect(() => {
    handleNodeSorting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateOnHourChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
      setET(localToEorzea(new Date()));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="card-container">
      {cards.map((node) => (<Card key={`card-${uuid()}`} data={node} time={eMinsTillNextSpawn(node.times, node.uptime)} />))}
    </div>
  );
};

const Card = ({ data, time }) => {
  const {
    node, job, zone, teleport, pos, times, uptime, id,
  } = data;
  const [x, y] = pos;

  const infoboxEnabled = useSelector((state) => state.ui.infobox);

  return (
    <div className="card">

      <div className="title-container">
        <div className="teleport">{getTranslation(teleport)}</div>
        <div className="timer">{time}</div>
      </div>

      <Resources node={node} job={job} />

      <div className={`info-container ${infoboxEnabled ? "" : "hide-me"}`}>
        <div className="zone">{`${zone}`}</div>
        <Icon className="skill-icon" icon={job} />
        <div className="coords">{`(${x}, ${y})`}</div>
        <div className="time">{formatTimes(times)}</div>
      </div>

    </div>
  );
};

export default Cards;
