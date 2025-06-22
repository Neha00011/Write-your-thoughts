import conf from "../conf/conf.js";
import { Client, Databases, Query } from "appwrite";
import sha1 from "crypto-js/sha1";

export class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  /* ----------------------------- POSTS (Appwrite) ---------------------------- */
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userid: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  /* -------------------------- FILES (Cloudinary) --------------------------- */
  /**
   * Upload a file to Cloudinary (unsigned upload)
   * @param {File} file
   * @returns {{ url: string, public_id: string }}
   */
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", conf.cloudinaryUploadPreset);
      if (conf.cloudinaryFolder) {
        formData.append("folder", conf.cloudinaryFolder);
      }

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${conf.cloudinaryCloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return { url: data.secure_url, public_id: data.public_id };
    } catch (error) {
      console.log("Cloudinary :: uploadFile :: error", error);
      return false;
    }
  }

  /**
   * Delete a file from Cloudinary (signed request – run on server)
   * @param {string} publicId
   * @returns {boolean}
   */
  async deleteFile(publicId) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = sha1(
        `public_id=${publicId}&timestamp=${timestamp}${conf.cloudinaryApiSecret}`
      ).toString();

      const body = new URLSearchParams({
        public_id: publicId,
        api_key: conf.cloudinaryApiKey,
        timestamp: timestamp.toString(),
        signature,
      });

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${conf.cloudinaryCloudName}/image/destroy`,
        {
          method: "POST",
          body,
        }
      );

      const result = await res.json();
      return result.result === "ok";
    } catch (error) {
      console.log("Cloudinary :: deleteFile :: error", error);
      return false;
    }
  }

  /**
   * Build a CDN URL for an existing Cloudinary public_id
   * @param {string} publicId
   * @param {string} [options] Cloudinary transformations (default: auto‑quality & format)
   * @returns {string}
   */
  getFilePreview(publicId, options = "q_auto,f_auto") {
    return `https://res.cloudinary.com/${conf.cloudinaryCloudName}/image/upload/${options}/${publicId}.jpg`;
  }
}

const service = new Service();
export default service;
