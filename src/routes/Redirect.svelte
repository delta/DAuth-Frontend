<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
</style>

<script lang="ts">
  import { auth } from './../utils/auth';
  import { params } from './../utils/queryParams';
  import { authorizeSession } from './../utils/authorizeSession';
  import { navigate } from 'svelte-routing';
  import { toasts, ToastContainer } from 'svelte-toasts';
  import config from '../../env';
  import { axiosInstance } from '../utils/axios';
  import { Button } from 'svelte-materialify';
  // export let isauth = localStorage.getItem('isDAuth');
  import { getContext, onMount } from 'svelte';
  import Login from './Login.svelte';
  import AuthorizeApp from './AuthorizeApp.svelte';
  let { theme } = getContext('theme');

  onMount(() => {
    let element: HTMLBodyElement = document.querySelector('.navbar');
    element.style.display = 'none';
    authorizeSession.set(true);
    if ($auth == 'true') {
      axiosInstance({
        method: 'get',
        url: `${config.backendurl}/oauth/authorize`,
        headers: { 'Content-Type': 'application/json' },
        params: $params
      })
        .then(result => {
          const isAuthorized = result.data.isAuthorized;
          if (isAuthorized == true) location.replace(result.data.client.redirectUri);
          else navigate('/authorize', { replace: true });
        })
        .catch(error => {
          let message;
          if (error.response) {
            message = error.response.data.message;
          } else if (error.request) {
            message = error.request.data.message;
          } else {
            message = 'Something went wrong, please try again!';
          }
          toasts.add({
            title: 'Oops',
            description: message,
            duration: 10000, // 0 or negative to avoid auto-remove
            placement: 'bottom-right',
            type: 'error',
            showProgress: true,
            theme: localStorage.getItem('DAuth-theme')
          });
        });
    } else {
      console.log('hitting here');
      navigate('/login', { replace: true });
    }
  });
</script>

<main>
  <div class="redirectContainer">
    <h1>You are being redirected to authorization page. Please wait!</h1>
    <div class="loader" role="status" />
  </div>
</main>
