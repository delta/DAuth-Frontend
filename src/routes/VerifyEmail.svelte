<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<script lang="ts">
  import { toasts } from 'svelte-toasts';
  import { navigate } from 'svelte-routing';
  import config from '../../env';
  import { Button } from 'svelte-materialify';
  import { getContext } from 'svelte';
  import { axiosInstance } from 'src/utils/axios';

  let { theme } = getContext('theme');
  const parameter = new URLSearchParams(window.location.search);
  const webmailId = parameter.get('webmailId');
  function signUp() {
    axiosInstance({
      method: 'get',
      url: `${config.backendurl}/auth/check-verification`
    })
      .then(result => {
        navigate('/registerdetails', { replace: true });
        toasts.add({
          title: 'Success',
          description: `${result.data.message}`,
          duration: 10000, // 0 or negative to avoid auto-remove
          placement: 'bottom-right',
          type: 'success',
          showProgress: true,
          theme: $theme.name
        });
      })
      .catch(error => {
        navigate('/error', { replace: true });
        toasts.add({
          title: 'Oops',
          description:
            error.response.data.message ||
            error.response.data.errors[0].msg ||
            'Something went wrong, please try again!',
          duration: 10000, // 0 or negative to avoid auto-remove
          placement: 'bottom-right',
          type: 'error',
          showProgress: true,
          theme: $theme.name
        });
      });
  }
</script>

<main>
  <div class="verifyContainer">
    <h2 class="verifyTitle">Verification Link Sent!</h2>
    <p class="verifyContent">
      Kindly check <span class="webmailId">{webmailId}</span> for the confirmation link.<br
      /> You need to confirm your webmail account in order to complete the signing up process.
    </p>
    <Button Tile id="signUp_button" on:click={signUp}>Sign Up</Button>
  </div>
</main>
