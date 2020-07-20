import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormBuilder from '../uis/FormBuilder';
import { getSettingsFormData } from '../../utilities/helpers/formHelpers/settingsForm';
import {
  updateSettingsById,
  getSettingsById,
  createSettings,
  deleteSettings,
} from '../../http/settingsApi';
import { PAGE_ROUTES } from '../../services/routeService';
import { fetchApi, setFetchApiInfo } from '../../store/actions/globalAction';

const Settings = ({ fetchApi, setFetchApiInfo }) => {
  const { id } = useParams();
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
    if (id) {
      fetchApi(true);
      getSettingsById(id).then(handleGetSuccuess).catch(handleGetErr);
    }
  }, [fetchApi, id, setFetchApiInfo]);

  const handleCreateNewSettings = newSettings => {
    const handleCreateSuccuess = res => {
      fetchApi(false);
      push(PAGE_ROUTES.settings);
      setFetchApiInfo({ type: 'success', message: 'Succuessfully created' });
    };
    const handleCreateErr = err => {
      console.log(err);
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to create Settings' });
    };
    fetchApi(true);
    createSettings(newSettings)
      .then(handleCreateSuccuess)
      .catch(handleCreateErr);
  };

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

  const handleDelete = () => {
    const handleDeleteSuccuess = () => {
      fetchApi(false);
      push(PAGE_ROUTES.settings);
    };
    const handleDeleteError = err => {
      fetchApi(false);
      setFetchApiInfo({ type: 'error', message: 'Unable to delete settings' });
    };
    fetchApi(true);
    deleteSettings(settings.id)
      .then(handleDeleteSuccuess)
      .catch(handleDeleteError);
  };

  if (settings.id && dataWithValue.length) {
    const editingSettings = { ...settings };
    dataWithValue.forEach(field => {
      editingSettings[`${field.id}`] = field.value;
    });
    console.log(editingSettings);
    if (editingSettings) {
      return (
        <FormBuilder
          title={'Edit Settings'}
          data={dataWithValue}
          onClick={handleFormSubmit}
          actor={editingSettings}
          handleDelete={handleDelete}
        />
      );
    }
    return null;
  } else if (!id) {
    const actor = { ...settings };
    return (
      <FormBuilder
        title={'Settings'}
        data={getSettingsFormData}
        onClick={handleCreateNewSettings}
        // actor={actor}
        buttonName={'Save Changes'}
      />
    );
  }
  return null;
};

const mapStateToProps = ({ global }) => {
  return { ...global };
};

const mapActionToProps = {
  fetchApi,
  setFetchApiInfo,
};

export default connect(mapStateToProps, mapActionToProps)(Settings);
