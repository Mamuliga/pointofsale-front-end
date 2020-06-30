import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableBuilder from '../uis/TableBuilder.js';
import { useHistory } from 'react-router-dom';
import { getSettingsTableHeaders } from '../../utilities/helpers/tableHelpers.js';
import { getSettings } from '../../http/settingsApi';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction.js';

const Settings = ({ fetchApi, setFetchApiInfo }) => {
  const { location, push } = useHistory();
  const [settingsList, setSettingsList] = useState([]);

  useEffect(() => {
    const handleGetSettingsResp = res => {
      fetchApi(false);
      if (Array.isArray(res.data)) {
        const displaySettingsList = res.data.map(
          ({
            id,
            logo,
            companyName,
            address,
            email,
            phoneNo,
            description,
            openingTime,
            closingTime,
          }) => {
            return {
              id,
              logo,
              companyName,
              address,
              email,
              phoneNo,
              description,
              openingTime,
              closingTime,
            };
          }
        );
        setSettingsList(displaySettingsList);
      }
    };
    const handleGetSettingsErr = err => {
      setFetchApiInfo({ type: 'error', message: 'Unable to get settings' });
      fetchApi(false);
    };
    fetchApi(true);
    getSettings().then(handleGetSettingsResp).catch(handleGetSettingsErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleEdit = settings => {
    const editClick = () => {
      push(`${location.pathname}/edit/${settings.id}`);
    };
    return editClick;
  };

  return (
    <TableBuilder
      tableData={settingsList}
      tableHeaders={getSettingsTableHeaders}
      handleEdit={handleEdit}
      title={'Settings'}
    />
  );
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Settings);
