import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import {useState, useEffect} from 'react';
import {format} from 'timeago.js';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { PostData, UserDetailData } from '../types';
import { getUserDetail } from '../services/userService';
import { getPostDetail, likePost } from '../services/postService';

const Post: React.FC<PostData> = ({ID = '', UserID, Title, Description, Image, Upvote, CreatedAt, UpdatedAt}) => {

    const user = useAuthStore((state) => state.user);
    const currentUserID = user?.id;
    const publicFolder = process.env.REACT_APP_BACKEND_URI + "/image/";
    const [postUserdata, setPostUserdata] = useState<UserDetailData>();

    const [recentLikes, setRecentLikes] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
      const fetchData = async () => {
        try {
          const { data } = await getUserDetail(1);
          setPostUserdata(data);
        } catch(err) {
          console.log(err);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await getPostDetail(Number(ID));
          setRecentLikes(data.likes?.length ?? 0);
        } catch(err) {
          console.log(err);
        }
      };
      fetchData()
    }, [loading]);

    const getFileComponent = () => {
      const extension = Image?.substring(Image.lastIndexOf('.') + 1).toLowerCase()
      if (extension === 'png' || extension === 'jpg') {
        return <img src={publicFolder + Image} alt="" className="w-1/2 h-1/2" />
      } else if (extension === 'mp4') {
        return <video controls className="w-1/2 h-1/2"><source src={publicFolder + Image} type="video/mp4" /></video>
      } else {
        return null
      }
    };

    const handleUpvote = async () => {
      try {
        setLoading(!loading)
      }
      catch(err) {
        console.log(err)
      }
    };

    return (
      <div className="bg-white p-4 shadow-md rounded-lg my-5 flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <img
              className="h-8 w-8 object-cover rounded-full  mr-2"
              src={'https://t3.ftcdn.net/jpg/02/43/51/48/360_F_243514868_XDIMJHNNJYKLRST05XnnTj0MBpC4hdT5.webp'}
              alt="user photo profile"
          />
          <Link 
            to={`/profile/${UserID}`}
            className='text-slate-800 text-md font-bold'
          >
            {postUserdata?.Username}
          </Link>
          <div className="text-gray-400 font-md">
            · {CreatedAt && format(new Date(CreatedAt).toLocaleString())}
          </div>
        </div>
        <div className="flex flex-col mb-5 gap-2">
          <p className="text-slate-700 font-bold text-2xl">
              {Title}
          </p>
          <p className="text-slate-700 font-semibold">
              {Description}
          </p>
        </div>
        {Image && getFileComponent()}
        <div className='flex items-center gap-8 mt-2'>
          <div className="flex gap-5 items-center bg-gray-200 px-2 py-1 rounded-xl">
            <div className="flex gap-2 items-center">
              <BiSolidUpvote 
                className='cursor-pointer hover:scale-105 hover:text-blue-500'
                onClick={handleUpvote}
              />
              <p className='font-bold text-gray-500'>Vote</p>
              <p className='text-slate-600 font-bold'>{recentLikes}</p>
            </div>
            <BiSolidDownvote
              className='cursor-pointer hover:scale-105 hover:text-blue-500' 
            />
          </div>
          <MdSaveAlt className='cursor-pointer hover:scale-105 hover:text-red-500 text-xl'/>
          <FaCommentDots className='cursor-pointer hover:scale-105 hover:text-cyan text-xl'/>
        </div>
      </div>
    );
  }

export default Post;

