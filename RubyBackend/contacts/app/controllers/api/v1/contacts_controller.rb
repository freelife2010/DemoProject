class Api::V1::ContactsController < ApplicationController
  def index
    render :json => [
      {name: 'Popa'},
      {name: 'Zach'},
      {name: 'Martin'},
      {name: 'Julia'},
      {name: 'Eduard'},
    ]
  end
end
