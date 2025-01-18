import { BsThreeDotsVertical } from "react-icons/bs";
import { S3_BASE_URL } from "../../config/constants";

// Define a reusable component for the content box
const GenerateBox = ({ item }) => (
  <div className="generate-box h-auto">
    <img
      className="explore-generate-img rounded-xl"
      src={item.imageSrc}
      alt={item.authorName}
    />
    <div className="mt-3 2xl:mt-4">
      <div className="flex justify-between">
        <div className="flex gap-3 2xl:gap-4 items-center">
          <img
            className="h-8 w-8 rounded-full"
            src={item.authorImage}
            alt={item.authorName}
          />
          <div>
            <h5>{item.authorName}</h5>
            <p>{item.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 2xl:gap-4">
          <div className="flex items-center gap-2">
            <h6>{item.rating}</h6>
            <img src={item.ratingIcon} alt="Rating Icon" />
          </div>
          <BsThreeDotsVertical className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
);

// Function to map an array of data to JSX
const renderBoxes = (data) =>
  data.map((item, index) => <GenerateBox key={index} item={item} />);

// Data sets
const data1 = [
  {
    imageSrc: `${S3_BASE_URL}/images/Explore/4 - Dream Totem.png`,
    authorImage: `${S3_BASE_URL}/images/Explore/Ellipse 3.png`,
    authorName: "Tony Stark",
    time: "1 hour ago",
    rating: "8/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/37 - Jin and Jang.png",
    authorImage: "Assets/Images/Explore/Ellipse 3.png",
    authorName: "Tony Stark",
    time: "1 hour ago",
    rating: "8/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/36 - Jhakri.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
];

const data2 = [
  {
    imageSrc: "Assets/Images/Explore/48 - Star Ram.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/39 - Skull Crab.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
];

const data3 = [
  {
    imageSrc: "Assets/Images/Explore/46 - Chapoya.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/36 - Jhakri.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/42-Borum,The-Bloodsworn.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
];
const data4 = [
  {
    imageSrc: "Assets/Images/Explore/42-Borum,The-Bloodsworn.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/34---Little-Aupa.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
  {
    imageSrc: "Assets/Images/Explore/46%20-%20Chapoya.png",
    authorImage: "Assets/Images/Explore/Ellipse 4.png",
    authorName: "Bruce Wayne",
    time: "2 hours ago",
    rating: "9/10",
    ratingIcon: "Assets/Images/All Icons/Group 40.svg",
  },
];

export default function ResponsiveGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div>{renderBoxes(data1)}</div>
      <div>{renderBoxes(data2)}</div>
      <div>{renderBoxes(data3)}</div>
      <div>{renderBoxes(data4)}</div>
    </div>
  );
}
