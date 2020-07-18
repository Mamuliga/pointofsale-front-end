import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getSettingsFormData } from '../../utilities/helpers/formHelpers/settingsForm';
import {
  updateSettingsById,
  getSettingsById,
  deleteSettings,
} from '../../http/settingsApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';

const FormSettings = ({ fetchApi, setFetchApiInfo }) => {
  const { push } = useHistory();
  const [dataWithValue, setDataWithValue] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const handleGetSuccuess = res => {
      fetchApi(false);
      const dataArray = [];
      const data = getSettingsFormData;
      const newSettings = res.data;
      Object.keys(res.data).forEach(id => {
        data.forEach(entry => {
          if (id === entry.id) {
            dataArray.push({ ...entry, value: newSettings[`${id}`] });
          }
          return null;
        });
      });
      setSettings(newSettings);
      setDataWithValue([...dataArray]);
    };
    const handleGetErr = err => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to get the settings details',
      });
    };

    fetchApi(true);
    getSettingsById(1).then(handleGetSuccuess).catch(handleGetErr);
  }, [fetchApi, setFetchApiInfo]);

  const handleFormSubmit = (updatedSettings, id) => {
    const handleUpdateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.settings);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully Updated' });
    };
    const handleUpdateErr = err => {
      fetchApi(false);
      setFetchApiInfo({
        type: 'error',
        message: 'Unable to update settings details',
      });
    };
    updatedSettings.id = undefined;
    // updatedCustomer.roleInPOS = undefined;
    fetchApi(true);
    updateSettingsById(id, updatedSettings)
      .then(handleUpdateSuccuess)
      .catch(handleUpdateErr);
  };
  const actor = { ...settings, logo: 'wewe' };
  return (
    <FormBuilder
      title={'Settings'}
      data={dataWithValue}
      onClick={handleFormSubmit}
      actor={actor}
      hideDeleteButton
      buttonName={'Save Changes'}
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

export default connect(mapStateToProps, mapActionToProps)(FormSettings);
