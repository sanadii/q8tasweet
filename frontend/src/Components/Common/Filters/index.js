import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAsyncDebounce } from "react-table";
import { StatusOptions, PriorityOptions, GenderOptions, GuaranteeStatusOptions } from "Components/constants";
import { electionSelector, campaignSelector } from 'Selectors';
import { Input } from "reactstrap";

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  );
};


// Search Filters & Others
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  SearchPlaceholder,
  setFilters,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setFilters(prev => ({ ...prev, global: value || undefined }));
  }, 200);

  React.useEffect(() => {
    setValue(globalFilter);
  }, [globalFilter]);

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <form>
          <strong>البحث</strong>
          <div className="search-box me-2 mb-2 d-inline-block col-12">
            <input
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id="search-bar-0"
              type="text"
              className="form-control search /"
              placeholder={SearchPlaceholder}
              value={value || ""}
            />
            {/* <i className="bx bx-search-alt search-icon"></i> */}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      id="custom-select"
      className="form-select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">الكل</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};


// Select Filter----------
const PriorityFilter = ({ filters, setFilters }) => {
  const ChangeSelectedPriority = (e) => {
    const selectedPriorityId = parseInt(e, 10);
    setFilters(prev => ({
      ...prev,
      priority: selectedPriorityId || null,
    }));
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>الأوليات</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            aria-label=".form-select-sm example"
            name="choices-select-priority"
            id="choices-select-priority"
            onChange={(e) => ChangeSelectedPriority(e.target.value)}
            value={filters.priority || ''}  // <-- This is the key change
          >
            <option value="">- جميع الأوليات - </option>
            {PriorityOptions.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

const StatusFilter = ({ filters, setFilters }) => {
  const ChangeSelectedStatus = (e) => {
    const selectedStatusId = parseInt(e, 10);
    setFilters(prev => ({
      ...prev,
      status: selectedStatusId || null,
    }));
  };


  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>الحالة</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-status"
            id="choices-select-status"
            onChange={(e) => ChangeSelectedStatus(e.target.value)}
            value={filters.status || ''}  // <-- This is the key change
          >
            <option value="">- جميع الحالات - </option>
            {StatusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

const GuaranteeStatusFilter = ({ filters, setFilters }) => {

  const ChangeCampaignGuaranteeStatus = (e) => {
    const selectedStatusId = e ? parseInt(e, 10) : null; // Convert string to integer, if no value is provided it will become null

    // Update the filters
    setFilters(prev => ({
      ...prev,
      status: selectedStatusId,
    }));
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>الحالة</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-status"
            id="choices-select-status"
            onChange={(e) => ChangeCampaignGuaranteeStatus(e.target.value)}
            value={filters.status || ''}
          >
            <option value="">- الكل - </option>
            {GuaranteeStatusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};


const CandidateGenderFilter = ({ setElectionCandidateList }) => {
  const electionCandidates = useSelector(electionSelector);

  const ChangeCandidateGender = (e) => {
    const selectedGender = e ? Number(e) : null; // Convert to number

    if (selectedGender) {
      setElectionCandidateList(
        electionCandidates.filter((item) => item.gender === selectedGender)
      );
    } else {
      setElectionCandidateList(electionCandidates); // Reset to original list if no gender selected
    }
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-gender"
            id="choices-select-gender"
            onChange={(e) => ChangeCandidateGender(e.target.value)}
          >
            <option value="">- الكل - </option>
            {GenderOptions.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

const GenderFilter = ({ filters, setFilters }) => {
  const campaignGuarantees = useSelector(campaignSelector);

  const ChangeGuaranteeGender = (e) => {
    const selectedGender = e ? Number(e) : null; // Convert to number

    // Update the filters
    setFilters(prev => ({
      ...prev,
      gender: selectedGender,
    }));
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>النوع</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-gender"
            id="choices-select-gender"
            onChange={(e) => ChangeGuaranteeGender(e.target.value)}
            value={filters.gender || ''}
          >
            <option value="">- الكل - </option>
            {GenderOptions.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};


const GuaranteeAttendanceFilter = ({ filters, setFilters }) => {
  const campaignGuarantees = useSelector(campaignSelector);

  const AttendanceOptions = [
    { id: 'true', name: "حضر" },
    { id: 'false', name: "لم يحضر" },
  ];

  const ChangeGuaranteeAttendance = (e) => {
    const selectedAttendance = e === "true" ? true : e === "false" ? false : null;


    // Update the filters
    setFilters(prev => ({
      ...prev,
      attended: selectedAttendance,
    }));
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>التحضير</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-attendeed"
            id="choices-select-attendeed"
            onChange={(e) => ChangeGuaranteeAttendance(e.target.value)}
            value={filters.attended === null ? '' : String(filters.attended)}
          >
            <option value="">- الكل - </option>
            {AttendanceOptions.map((attendance) => (
              <option key={attendance.id} value={attendance.id}>
                {attendance.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};


// const AttendeeGenderFilter = ({ filters, setFilters }) => {
//   const electionAttendees = useSelector(
//     (state) => state.Campaigns.electionAttendees
//   );

//   const ChangeAttendeeGender = (e) => {
//     const selectedGender = e ? Number(e) : null; // Convert to number

//     // Update the filters
//     setFilters(prev => ({
//       ...prev,
//       gender: selectedGender,
//     }));
//   };

//   return (
//     <React.Fragment>
//       <div className="col-lg-3 col-sm-2">
//         <strong>Gender</strong>
//         <div className="input-light">
//           <select
//             className="form-select form-control"
//             name="choices-select-gender"
//             id="choices-select-gender"
//             onChange={(e) => ChangeAttendeeGender(e.target.value)}
//             value={filters.gender || ''}
//           >
//             <option value="">- All Genders - </option>
//             {GenderOptions.map((gender) => (
//               <option key={gender.id} value={gender.id}>
//                 {gender.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// const AttendeeGenderFilter = ({ setElectionAttendeeList }) => {
//   const electionAttendees = useSelector(
//     (state) => state.Campaigns.electionAttendees
//   );

//   const ChangeAttendeeGender = (e) => {
//     const selectedGender = e ? Number(e) : null; // Convert to number

//     if (selectedGender) {
//       setElectionAttendeeList(
//         electionAttendees.filter((item) => item.gender === selectedGender)
//       );
//     } else {
//       setElectionAttendeeList(electionAttendees); // Reset to original list if no gender selected
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="col-lg-3 col-sm-2">
//         <div className="input-light">
//           <select
//             className="form-select form-control"
//             name="choices-select-gender"
//             id="choices-select-gender"
//             onChange={(e) => ChangeAttendeeGender(e.target.value)}
//           >
//             <option value="">- All Genders - </option>
//             {GenderOptions.map((gender) => (
//               <option key={gender.id} value={gender.id}>
//                 {gender.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

const GuarantorFilter = ({ filters, setFilters }) => {
  const { campaignMembers } = useSelector(campaignSelector);

  const [sortedGurantorOptions, setSortedGuarantorOptions] = useState([]);

  useEffect(() => {
    const GurantorOptions = campaignMembers.filter(
      (member) => member.role === 2 || member.role === 3 || member.role === 4
    );

    setSortedGuarantorOptions(GurantorOptions.sort((a, b) => a.role - b.role));
  }, [campaignMembers]);


  const ChangeGuaranteeRole = (e) => {
    const selectedRole = e.target.value ? parseInt(e.target.value, 10) : null;

    // Update the filters
    setFilters(prev => ({
      ...prev,
      member: selectedRole,
    }));
  };


  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>الضامن</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-guarantor"
            id="choices-select-guarantor"
            onChange={ChangeGuaranteeRole}
            value={filters.member || ''}
          >
            <option value="">- الكل - </option>
            {sortedGurantorOptions.map((member) => (
              <option key={member.id} value={member.id}>
                {member.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};




const SearchFilter = ({ filters, setFilters, searchField }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      [searchField]: value
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder={`Search by ${searchField}`}
        value={filters[searchField] || ''}
        onChange={handleSearchChange}
      />
    </div>
  );
};

const ElectionCommitteeFilter = ({ filters, setFilters }) => {
  const { electionAttendees, electionCommittees } = useSelector(electionSelector);

  // Directly sorting the committees
  const sortedCommitteeOptions = [...electionCommittees].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const ChangeCommitteeOption = (e) => {
    const selectedCommittee = e.target.value ? parseInt(e.target.value, 10) : null;

    // Update the filters
    setFilters(prev => ({
      ...prev,
      committee: selectedCommittee,
    }));
  };

  return (
    <React.Fragment>
      <div className="col-lg-3 col-sm-2">
        <strong>اللجان</strong>
        <div className="input-light">
          <select
            className="form-select form-control"
            name="choices-select-committee"
            id="choices-select-committee"
            onChange={ChangeCommitteeOption}
            value={filters.committee || ''}
          >
            <option value="">- جميع اللجان - </option>
            {sortedCommitteeOptions.map((committee) => (
              <option key={committee.id} value={committee.id}>
                {committee.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};



const ResetFilters = ({ setFilters, activeTab, setActiveTab }) => {

  return (
    <React.Fragment>
      <p></p>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          setFilters({
            status: null,
            priority: null,
            category: null,
            role: null,
            gender: null,
            member: null,
            attended: null,
            guaranteeStatus: null,
            global: ""
          });

          setActiveTab("0");
        }}
      >
        <i className="ri-filter-2-line me-1 align-bottom"></i> إعادة
      </button>
    </React.Fragment>
  );
};

export {

  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SearchFilter,

  // Election Filters
  StatusFilter,
  PriorityFilter,
  CandidateGenderFilter,
  GenderFilter,
  // AttendeeGenderFilter,
  GuaranteeAttendanceFilter,
  GuaranteeStatusFilter,
  // MemberRoleFilter,
  GuarantorFilter,
  // Reset Filters
  ElectionCommitteeFilter,

  // Reset Filters
  ResetFilters,

};