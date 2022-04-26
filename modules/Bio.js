import EditBioForm from './EditBio'
import { getEntryFromDb } from '../database'

const Bio = async () => {
  const userInfo = await getEntryFromDb('bio') || []
    return `
    <section class="bio">
        <div class="profile-photo">
            <img src="https://4zxaxmhmwgx4ouuwgx5nbkodrhm9vbs8.runner-forwarder-a-01.elice.io/img/ig_profile.png" alt="profile-photo">
        </div>
        <div class="profile-info">
            <p class="name">${userInfo[0] ? userInfo[0].name : "Please update your bio"}</p>
            <p class="about">${userInfo[0] ? userInfo[0].about : "Please update your bio"}</p>
            <button class="edit-bio-button">Edit bio</button>
        </div>
        ${EditBioForm()}
</section>
    `
}

export default Bio