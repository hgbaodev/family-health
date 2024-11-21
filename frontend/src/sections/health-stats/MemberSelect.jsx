import { useMembersSelect } from '~/api/health-stats/get-members-select';
import { useEffect, useRef } from 'react';

const MemberSelect = ({ onChange }) => {
  const { data: members, isLoading, isError } = useMembersSelect();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Chỉ gọi onChange với thành viên đầu tiên khi trang mới load
    if (isFirstLoad.current && members && members.length > 0) {
      onChange(members[0].memberId);
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
        <option key={member.id} value={member.id}>
          {member.fullName}
        </option>
      ))}
    </select>
  );
};

export default MemberSelect;
