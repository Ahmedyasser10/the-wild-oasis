import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = Boolean(typeof newCabin.image === "string");
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-iamges/${imageName}`;

  // create/edit cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B)EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) throw new Error("Cabin could not be created or edit");

  // don't upload new image if the user does't give any new image
  if (hasImagePath) return data;
  // Upload image
  const { error: storgeError } = await supabase.storage
    .from("cabin-iamges")
    .upload(imageName, newCabin.image);
  // Delete Cabin if was an error uploading image
  if (storgeError) {
    deleteCabin(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
