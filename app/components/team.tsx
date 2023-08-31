import Image from 'next/image'

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
}

export default function Team() {
  return (
    <>
      <div className="px-8 py-12 bg-sentinel-blue">
        <p className="font-medium text-2xl mt-2 text-gray-50">Meet your IT team</p>

        <div className="w-full flex justify-between">
          <div className="w-[58%] mt-8 border-t border-gray-100">
            <p className="font-medium text-lg mt-8 text-gray-100">
              Software and Device Support
            </p>
            <br/>
            <br />
            <TeamMember
              name="Harsh Kamani"
              role="SOC Analyst"
              imageSrc="/tovo-1.jpg" // Replace with actual image URL
            />
            <br />
            <TeamMember
              name="Tandon Samora"
              role="SOC Analyst"
              imageSrc="/tovo-1.jpg" // Replace with actual image URL
            />
            
          </div>
          <div className="w-[37%] border-t border-gray-100">
            <p className="font-medium text-lg mt-8 text-gray-100">
              Helpdesk Support
            </p>
            <br/>
            <br />
            <TeamMember
              name="Brian Tovo"
              role="IT Associate"
              imageSrc="/tovo-2.jpg" // Replace with actual image URL
            />
            <br />
            <TeamMember
              name="Faith Mueni"
              role="Head of Projects"
              imageSrc="/tovo-3.jpg" // Replace with actual image URL
            />
          </div>
        </div>
      </div>
    </>
  );
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageSrc }) => (
  <div className="flex gap-4">
    <div className="member-image">
      <Image width={100} height={100} alt={name} className="h-16 w-16 rounded-full" src={imageSrc} />
    </div>
    <div className="member-details">
      <h3 className="font-medium text-white text-md">{name}</h3>
      <p className="text-gray-200 text-sm">{role}</p>
    </div>
  </div>
);
