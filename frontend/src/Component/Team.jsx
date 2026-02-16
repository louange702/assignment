import Navbar from './Navbar';
import Footer from './Footer';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'LOUANGE',
      role: 'CEO & Founder',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/606423417_888565943551181_3779495111267279535_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHr79fqVSxHLLbrWN-OCFW8nOMHu43fS8Cc4we7jd9LwFJgbPFbznF1xdq9J3uK6ACTDaVpon7X5yx507u0iaFP&_nc_ohc=cxtNpsmcPdsQ7kNvwGmqi7A&_nc_oc=Adl1z-CSVqW5AAnDXk9lbaCZOSYDj2PNgMnpm9I8Vl_XATSo8lax2o2XFv1INl0KBDc&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=9YouS3dzreYdDcTOXNqw1w&oh=00_Afu_CeSTxEfyTjMWMtsnZgJkxxehWJ4VHwiTcivLKe1WSw&oe=69974FDB'
    },
    {
      id: 2,
      name: 'INEZA',
      role: 'Lead Designer',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t51.75761-15/488677641_17880001965276802_7179145030772818199_n.webp?stp=dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHvBN3nMJzPFxk-ai8kVdBy8meOQVrC2UryZ45BWsLZSr3is0JOHDA_036vtypAS-0y6TDvO-Am5BwXiSk7GkxY&_nc_ohc=_3AE2VVVblEQ7kNvwH90qL-&_nc_oc=AdndM6AnhAX3cD6gQHtvdOJHYggZFafrwVCv5o7mF_CaBBbQ-6SsBqPAXndAxwZfiYc&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=dd7RD8dsMvO4vEYklJoL2g&oh=00_AfsnZgkQf4yZyiKWCRlHu_fmVxWduE2Mrc5tUcLUA5kbVA&oe=69974B02'
    },
    {
      id: 3,
      name: 'WINNER K',
      role: 'Software Engineer',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/524988363_766102109130899_4560305984172355180_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGW5ZTFhOONmamiC7iQxhcz0VxXtyjPmZDRXFe3KM-ZkP6WknMVxLZSPP-_uuoMooW_a55pQfa9lTgXXu5ts5zS&_nc_ohc=qXN9pBA9UX0Q7kNvwHp4SO6&_nc_oc=AdnW2cYNk28dW2n4R4gDNUYf5u515ogSmrLpKD89B01UvhWQW3LzyjyLfnIsIg-hzzE&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=3Yreg8HoYXDKE4qVrp01ig&oh=00_AfsX14P84M821tINmaNXN4KB3psRlOmEb23-3HGIMd2kkg&oe=699769BB'
    }
  ];

  return (
    <div className="container">
      <Navbar />
      <h1>Our Team</h1>
      <p>Meet the dedicated members of Garden tss.</p>
      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member">
            <div className="member-image">
              <img src={member.image} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Team;
