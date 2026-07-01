Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  root "pages#home"
  get "feed.xml", to: "feeds#show", as: :feed, format: false
  get "entry/:slug", to: "entries#show", as: :entry
  get "submit", to: "submissions#new", as: :new_submission
  resources :submissions, only: [ :create, :edit, :update ]
  patch "submissions/:id/status", to: "submissions#transition", as: :submission_status
  get "categories", to: "categories#index"
  post "entries/:entry_id/vote", to: "votes#create", as: :entry_vote
  get "sign_in", to: "sessions#new", as: :sign_in
  post "sign_in", to: "sessions#create"
  delete "sign_out", to: "sessions#destroy", as: :sign_out
  get "sign_up", to: "registrations#new", as: :sign_up
  post "sign_up", to: "registrations#create"

  get "confirm_email/:token", to: "confirmations#show", as: :confirm_email
  post "confirm_email", to: "confirmations#create", as: :resend_confirmation

  post "digest", to: "digest_subscriptions#create", as: :digest_subscriptions
  get "digest/unsubscribe/:token", to: "digest_subscriptions#destroy", as: :digest_unsubscribe

  get "sitemap.xml", to: "sitemaps#show", defaults: { format: "xml" }, as: :sitemap

  # Featured-listing payments (Stripe Checkout).
  get "checkout/success", to: "payments#success", as: :checkout_success
  get "checkout/cancel", to: "payments#cancel", as: :checkout_cancel
  post "webhooks/stripe", to: "webhooks/stripe#create"

  get "password/reset", to: "passwords#new", as: :new_password_reset
  post "password/reset", to: "passwords#create", as: :password_reset
  get "password/reset/:token/edit", to: "passwords#edit", as: :edit_password_reset
  patch "password/reset/:token", to: "passwords#update", as: :update_password_reset

  namespace :admin do
    root to: "submissions#index"
    resources :submissions, only: [:index] do
      member do
        patch :approve
        patch :request_changes
      end
    end
  end

  get "account", to: "accounts#settings", as: :account_settings
  patch "account/profile", to: "accounts#update_profile", as: :account_profile
  patch "account/security", to: "accounts#update_security", as: :account_security
  patch "account/notifications", to: "accounts#update_notifications", as: :account_notifications
  post "account/api_key", to: "accounts#regenerate_api_key", as: :account_api_key
  delete "account", to: "accounts#destroy", as: :account
  get "account/submissions", to: "accounts#submissions", as: :manage_submissions
end
