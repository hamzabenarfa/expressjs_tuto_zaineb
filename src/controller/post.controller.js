const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const postData = await prisma.post.findMany({});
    res.json(postData);
  } catch (error) {
    res.json(error);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const postData = await prisma.post.findFirst({
      where: { id: parseInt(id) },
    });
    if (!postData) {
      return res.json({ error: "post doesnt exist" });
    }
    res.json(postData);
  } catch (error) {
    res.json(error);
  }
};


const createPost = async (req, res) => {
    const { title, body } = req.body;
  
    try {
      const createdPost = await prisma.post.create({
        data: { title, body },
      });
      res.json(createdPost);
    } catch (error) {
      res.json(error);
    }
  }

  const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, body } = req.body;
  
    try {
      const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, body },
      });
  
      res.json(updatedPost);
    } catch (error) {
      res.json(error);
    }
  }

  const deletePost =async (req, res) => {
    const id = req.params.id;
  
    try {
      const postExist = await prisma.post.findFirst({
        where: { id: parseInt(id) },
      });
      if (!postExist) {
        return res.json({ error: "post not found" });
      }
      await prisma.post.delete({
        where: { id: parseInt(id) },
      });
      res.json({ message: "deleted successfuly" });
    } catch (error) {
      res.json(error);
    }
  }

module.exports = { getAllPosts,getPostById ,createPost,updatePost,deletePost};
