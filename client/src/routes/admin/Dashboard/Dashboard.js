import './Dashboard.css';
import { useState, useEffect } from 'react';
import axios from './../../../utils/axios';
import SideBar from '../../../components/AdminSideBar/AdminSideBar';
import Table from './../../../components/AdminTable/AdminTable';
import AddStaff from './../../../components/AddStaff/AddStaff';
import Exams from './../../../components/AddExams/AddExams';

const Dashboard = () => {
  const [adminData, setAdminData] = useState({});
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [peopleExams, setPeopleExams] = useState([]);

  const [currentSection, setCurrentSection] = useState('exams');

  useEffect(() => {
    getPeopleExams();
    getAdmins();
    getAdminData();
    getEmployees();
  }, []);

  const getPeopleExams = async () => {
    try {
      const baseURL = '/admin/getPeopleExams.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, peopleExams } = request.data;

      if (success === true) {
        setPeopleExams(peopleExams);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAdminData = async () => {
    try {
      const baseURL = '/auth/admin/adminGetData.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, data } = request.data;

      if (success === true) {
        setAdminData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAdmins = async () => {
    try {
      const baseURL = '/admin/getAdmins.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, admins } = request.data;

      if (success === true) {
        setAdmins(admins);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployees = async () => {
    try {
      const baseURL = '/admin/getEmployees.php';
      const request = await axios.get(baseURL, {
        headers: {
          'X-Access-Token': localStorage.getItem('token'),
        },
      });
      const { success, employees } = request.data;

      if (success === true) {
        setEmployees(employees);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    Object.keys(adminData).length > 0 && (
      <div className="bg-gray-50 md:h-screen md:flex">
        <SideBar {...{ currentSection, setCurrentSection, adminData }} />

        <div className="px-2 py-5 md:w-4/5 overflow-auto">
          {currentSection === 'exams' && (
            <Table
              content={currentSection}
              data={peopleExams}
              updateList={setPeopleExams}
            />
          )}
          {currentSection === 'admins' && (
            <Table
              content={currentSection}
              data={admins}
              updateList={setAdmins}
            />
          )}
          {currentSection === 'employees' && (
            <Table
              content={currentSection}
              data={employees}
              updateList={setEmployees}
            />
          )}

          {currentSection === 'add staff' && <AddStaff />}

          {currentSection === 'add exams' && <Exams />}
        </div>
      </div>
    )
  );
};

export default Dashboard;
