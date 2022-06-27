import React from "react";
import styles from "./CommonTop.module.css";
import { Tooltip } from "@mui/material";
import { ReactComponent as AddIcon } from "../../../asset/svg/add.svg";
import { ReactComponent as SettingIcon } from "../../../asset/svg/setting.svg";
import { ReactComponent as RefreshIcon } from "../../../asset/svg/refresh.svg";

function CommonTop({ setSettingsClicked, settingsClicked, onClickAddButton, dataLength, title, onRefresh }) {
  return (
    <div className={styles.top}>
      <div className={styles.left}>
        <h5 className={styles.title}>
          {title} <span>{dataLength} {title} found</span>
        </h5>
      </div>

      <div className={styles.right}>
        {onRefresh && (
          <Tooltip title='Refresh Data' arrow placement='top'>
            <RefreshIcon width={24} height={24} onClick={() => onRefresh()} />
          </Tooltip>
        )}
        {onClickAddButton && (
          <Tooltip title='Add Item' arrow placement='top'>
            <AddIcon width={28} height={28} onClick={onClickAddButton} />
          </Tooltip>
        )}

        {setSettingsClicked && (
          <Tooltip title='Verify/Refute' arrow placement='top'>
            <SettingIcon width={24} height={24} onClick={() => setSettingsClicked(!settingsClicked)} />
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default CommonTop;
