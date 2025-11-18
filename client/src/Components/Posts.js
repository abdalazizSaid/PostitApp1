import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../Features/PostSlice";
import { Table } from "reactstrap";
import moment from "moment";
import { likePost } from "../Features/PostSlice";
import { FaThumbsUp } from "react-icons/fa6";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts || []);
  const email = useSelector((state) => state.users.user?.email);
  const userId = useSelector((state) => state.users.user?._id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLikePost = (postId) => {
    dispatch(likePost({ postId, userId }));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="postsContainer">
      <Table className="table table-striped">
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.email}</td>
              <td>
                <p>{moment(post.createdAt).fromNow()}</p>
                {post.postMsg}
                <p className="likes">
                  <button onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </button>
                  ({post.likes?.count ?? 0})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Posts;
