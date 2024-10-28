import { useMembersSelect } from '~/api/health-stats/get-members-select';
import React, { useEffect, useRef } from 'react';

const MemberSelect = ({ onChange }) => {
  const { data: members, isLoading, isError } = useMembersSelect();
  const isFirstLoad = useRef(true); // Biến cờ để kiểm tra lần đầu load

  useEffect(() => {
    // Chỉ gọi onChange với thành viên đầu tiên khi trang mới load
    if (isFirstLoad.current && members && members.length > 0) {
      onChange(members[0].memberID);
      isFirstLoad.current = false; // Đặt lại cờ sau lần gọi đầu tiên
    }
  }, [members, onChange]);

  if (isLoading) return <p>Loading members...</p>;
  if (isError) return <p>Error loading members. Please try again.</p>;

  return (
    <select
      className="member-select"
      onChange={(e) => onChange(e.target.value)}
      style={{ height: 37, borderRadius: 5 }}
    >
      {members?.map((member) => (
        <option key={member.memberID} value={member.memberID}>
          {member.fullName}
        </option>
      ))}
    </select>
  );
};

export default MemberSelect;
