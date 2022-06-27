import React from "react";
import styles from "./CommonTop.module.css";
import { Tooltip } from "@mui/material";
import { ReactComponent as SearchIcon } from "../../../asset/svg/search.svg";
import { ReactComponent as SettingIcon } from "../../../asset/svg/setting.svg";

function CommonTop({ setSettingsClicked, settingsClicked, dataLength,title }) {
  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <h5 className={styles.title}>
          {title} <span>{dataLength} {title} Found</span>
        </h5>
      </div>

      <div className={styles.right}>
        <SearchIcon width={24} height={24} />
        <Tooltip title='Verify/Refute' arrow placement='top'>
          <SettingIcon width={24} height={24} onClick={() => setSettingsClicked(!settingsClicked)} />
        </Tooltip>
      </div>
    </div>
  );
}

export default CommonTop;
